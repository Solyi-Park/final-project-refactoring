import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postInputState } from 'recoil/posts';
import { roleState } from 'recoil/users';
import { categoryList } from '../common/lists';
import St from './style';

function SelectCategory() {
  const role = useRecoilValue(roleState);

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { category } = postInput;

  // user Role에 따라 보이는 카테고리 필터
  const filteredCategoryList = useMemo(() => {
    return role === 'user' ? categoryList.filter((category) => !category.isAdmin) : categoryList;
  }, [categoryList, role]);

  const onChangeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setPostInput({
      ...postInput,
      category: newCategory
    });
  };

  return (
    <St.Select value={category} onChange={onChangeSelectHandler}>
      {filteredCategoryList.map((item, idx) => {
        return (
          <option key={idx} value={item.nameEng}>
            {item.nameKor}
          </option>
        );
      })}
    </St.Select>
  );
}

export default SelectCategory;
