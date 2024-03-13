import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRef } from 'react';
import { FaRegTrashAlt } from '@react-icons/all-files/fa/FaRegTrashAlt';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { deleteImage, uploadSingleImage } from 'api/postApi';
import dragndropPNG from 'assets/icons/dragndrop.png';
import dragndropWEBP from 'assets/icons/dragndrop.webp';
import { useModal } from 'hooks/useModal';
import { QUERY_KEYS } from 'query/keys';
import { modalState } from 'recoil/modals';
import { imageUploadingStatusState, isEditingPostState, postInputState } from 'recoil/posts';
import { db } from 'shared/firebase';
import { DownloadedImageType } from 'types/PostType';
import { resizeCoverImageFile } from 'util/imageResize';
import St from './style';

function ImageUpload() {
  const modal = useModal();
  const setIsModalOpen = useSetRecoilState(modalState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 상태 관리
  const [imageUploadingStatus, setImageUploadingStatus] = useRecoilState(imageUploadingStatusState);

  const isEditingPost = useRecoilValue(isEditingPostState);
  const { foundPost } = isEditingPost;
  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { coverImages } = postInput;

  const queryClient = useQueryClient();

  // 이미지 올리는 query
  const addImageMutation = useMutation({
    mutationFn: (file: File) =>
      uploadSingleImage({
        coverImage: file
      }),
    onSuccess: (downloadedImage) => {
      if (downloadedImage) {
        // 정상적으로 url을 반환 받았는지 확인
        queryClient.invalidateQueries({ queryKey: ['coverImages'] });

        setPostInput((currentInput) => {
          // 그 전에 보여지고 있던 로컬 파일의 미리보기 없애기
          const updatedImages = currentInput.coverImages.filter((image) => image.isLocal !== true);
          // 반환 받은 firebase url 정보 넣어주기
          return { ...currentInput, coverImages: [...updatedImages, downloadedImage] };
        });
        setImageUploadingStatus('Finished');
      }
    },
    onError: (error, variables) => {
      setPostInput((currentInput) => {
        const updatedImages = currentInput.coverImages.filter(
          (image) => !(image.isLocal && image.name === variables.name)
        );
        return { ...currentInput, coverImages: updatedImages };
      });
      console.log('이미지 업로드 실패', error);
    }
  });

  // 드래그앤드롭 핸들링
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedImageFiles = event.dataTransfer.files;
    processImages(selectedImageFiles);
  };

  // input 태그를 통해 선택된 이미지를 coverImages 배열 안에 file 타입으로 넣기
  const onAddImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = event.target.files;
    if (selectedImageFiles) {
      processImages(selectedImageFiles);
    }
  };

  // 사용자가 업로드한 이미지 유효성 검사
  const processImages = async (selectedImageFiles: FileList) => {
    // 업로드 가능한 이미지 개수 제한
    const totalImages = selectedImageFiles.length + (coverImages ? coverImages.length : 0);
    if (totalImages > 3) {
      const onClickConfirm = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen03: false }));
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '[업로드 수량 안내]',
        message: '최대 업로드 가능한 개수는 3개입니다.',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickConfirm
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen03: true }));
      return;
    }
    // 업로드 가능한 이미지 파일 크기 하나씩 확인하면서 제한
    for (let i = 0; i < selectedImageFiles?.length; i++) {
      if (selectedImageFiles[i].size <= 5 * 1024 * 1024) {
        try {
          setImageUploadingStatus('Loading...');
          // 이미지 사이즈 변경
          const resizedImageFile = await resizeCoverImageFile(selectedImageFiles[i]);
          const tempUrl = URL.createObjectURL(resizedImageFile as File);
          const tempImage = { name: selectedImageFiles[i].name, url: tempUrl, thumbnailUrl: null, isLocal: true };

          setPostInput((currentInput) => ({
            ...currentInput,
            coverImages: [...currentInput.coverImages, tempImage]
          }));
          addImageMutation.mutate(resizedImageFile as File);
        } catch (err) {
          console.log(err);
        }

        // mutation 매개변수 넘겨주기
      } else {
        // 용량 초과 안내 모달
        const onClickConfirm = () => {
          setIsModalOpen((prev) => ({ ...prev, isModalOpen04: false }));
          modal.close();
        };

        const openModalParams: Parameters<typeof modal.open>[0] = {
          title: '[업로드 용량 안내]',
          message: '최대 업로드 가능한 용량을 초과하였습니다.',
          leftButtonLabel: '',
          onClickLeftButton: undefined,
          rightButtonLabel: '확인',
          onClickRightButton: onClickConfirm
        };
        modal.open(openModalParams);
        setIsModalOpen((prev) => ({ ...prev, isModalOpen04: true }));
      }
    }
  };

  // 박스 전체 눌러도 이미지 선택할 수 있게
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 삭제 Mutation
  const deleteImageMutation = useMutation({
    mutationFn: (url: string) => deleteImage(url),
    onSuccess: async (url) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });

      // Firebase Post 데이터 업데이트
      if (isEditingPost && foundPost) {
        const postRef = doc(db, QUERY_KEYS.POSTS, foundPost.id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          const postData = postSnap.data();
          const coverImagesAfterDelete = postData.coverImages.filter((image: DownloadedImageType) => image.url !== url);
          await updateDoc(postRef, {
            coverImages: coverImagesAfterDelete
          });
        }
      }
    },
    onError: (error) => {
      console.log('이미지 삭제 실패', error);
    }
  });

  // 이미지 삭제
  const onDeleteImageHandler = (image: DownloadedImageType) => {
    const onClickCancel = () => {
      modal.close();
      setIsModalOpen((prev) => ({ ...prev, isModalOpen05: false }));
      return;
    };

    const onClickConfirm = () => {
      const deleteImages = coverImages.filter((i) => i.url !== image.url);
      setPostInput({
        ...postInput,
        coverImages: deleteImages
      });
      if (!image.isLocal) {
        deleteImageMutation.mutate(image.url);
      }

      setIsModalOpen((prev) => ({ ...prev, isModalOpen05: false }));
      modal.close();
    };

    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '삭제하시겠습니까?',
      message: '',
      leftButtonLabel: '취소',
      onClickLeftButton: onClickCancel,
      rightButtonLabel: '확인',
      onClickRightButton: onClickConfirm
    };
    modal.open(openModalParams);
    setIsModalOpen((prev) => ({ ...prev, isModalOpen05: true }));
  };

  // 이미지 상태 관리

  return (
    <St.UploadContainer>
      <St.DragNDropContainer onClick={handleButtonClick} onDragOver={handleDragOver} onDrop={handleDrop}>
        <input
          type="file"
          multiple
          onChange={onAddImageHandler}
          style={{ display: 'none' }}
          ref={fileInputRef}
          accept=".jpg,.jpeg,.png"
        />
        <picture>
          <source srcSet="icons/dragndrop.webp" type="image/webp" />
          <img src="icons/dragndrop.png" alt="dragndrop" />
        </picture>
        <button>Upload</button>
        <St.UploadTextBox>
          <p>Drag & drop to load</p>
          <span>Maximum file size is 5MB</span>
        </St.UploadTextBox>
      </St.DragNDropContainer>
      <St.PreviewTitle>커버 이미지 미리보기</St.PreviewTitle>
      <St.PreviewContainer>
        {coverImages &&
          coverImages.map((image) => {
            return (
              <St.SinglePreview key={image.url}>
                <img src={image.url} alt={'cover'} />
                <St.SinglePreviewInfo>
                  <div>
                    <p>{image.name}</p>
                    <span>{imageUploadingStatus}</span>
                  </div>
                  <button onClick={() => onDeleteImageHandler(image)}>
                    <FaRegTrashAlt />
                  </button>
                </St.SinglePreviewInfo>
              </St.SinglePreview>
            );
          })}
      </St.PreviewContainer>
    </St.UploadContainer>
  );
}

export default ImageUpload;
