import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import { IoCalendarClearOutline } from '@react-icons/all-files/io5/IoCalendarClearOutline';
import { getMyPosts } from 'api/myPostAPI';
// import calendarSpringPNG from 'assets/calendarSpring.png';
// import calendarSpringWEBP from 'assets/calendarSpring.webp';
// import mangoFavPNG from 'assets/mango-favicon.png';
// import mangoFavWEBP from 'assets/mango-favicon.webp';
import { AuthContext } from 'context/AuthContext';
import { QUERY_KEYS } from 'query/keys';
import { getFormattedDateCustom } from 'util/formattedDateAndTime';
import St from './style';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const HabitCalendar = ({ date }: any) => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;
  // 초기값은 현재 날짜
  const [today, setToday] = useState<Value>(new Date());
  const onChangeToday = () => {
    setToday(today);
  };

  const { data: myPosts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, 'myPosts'],
    queryFn: getMyPosts,
    enabled: !!authCurrentUser,
    staleTime: 60_000
  });

  const createdAtList = myPosts ? myPosts.map((data) => getFormattedDateCustom(data.createdAt!)) : [];
  const dayList: string[] = [];

  const getElCount = (arr: string[]): Record<string, number> =>
    arr.reduce((ac: Record<string, number>, v) => {
      ac[v] = (ac[v] || 0) + 1;
      return ac;
    }, {});
  const dayCount = getElCount(createdAtList);

  return (
    <St.CalendarWrapper>
      <St.StyleCalendar>
        <St.CalendarContainer>
          <St.CalendarIntroduce>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <picture>
                <source srcSet="/images/mango-favicon.webp" type="image/webp" />
                <img src="/images/mango-favicon.png" alt="mago-Logo" />
              </picture>
              <span>망고 달력</span>
            </div>

            <br />
            <div>
              <p>오늘도 지구를 지키기 위해 노력하셨군요</p>
              <br />
              <p>글을 쓰면 망고스티커를 드려요!</p>
            </div>
          </St.CalendarIntroduce>
          <picture>
            <source srcSet="images/calendarSpring.webp" type="image/webp" />
            <St.CalendarSpring1 src="images/calendarSpring.png" />
          </picture>
          <picture>
            <source srcSet="images/calendarSpring.webp" type="image/webp" />
            <St.CalendarSpring2 src="images/calendarSpring.png" />
          </picture>
          <picture>
            <source srcSet="images/calendarSpring.webp" type="image/webp" />
            <St.CalendarSpring3 src="images/calendarSpring.png" />
          </picture>
          <picture>
            <source srcSet="images/calendarSpring.webp" type="image/webp" />
            <St.CalendarSpring4 src="images/calendarSpring.png" />
          </picture>
          <St.CalendarTitle>Calendar</St.CalendarTitle>
        </St.CalendarContainer>
        <Calendar
          onChange={onChangeToday}
          value={today}
          // eng 버전
          locale="en"
          // 일요일부터 시작
          calendarType="gregory"
          tileContent={({ date, view }) => {
            const formattedDate = dayjs(date).format('YYYY. MM. DD.');
            if (createdAtList.find((x) => x === dayjs(date).format('YYYY. MM. DD.'))) {
              const postCount = dayCount[formattedDate] || 0;
              return (
                <>
                  <div className="habitDayContainer" key={formattedDate}></div>
                  <St.CalendarContentsContainer>
                    <div />
                    <picture>
                      <source srcSet="images/mango-favicon.webp" type="image/webp" />
                      <img
                        key={formattedDate}
                        className="habitImage"
                        src="images/mango-favicon.png"
                        alt={`habit-sticker-${formattedDate}`}
                      />
                    </picture>

                    <St.PostCount> x{postCount}</St.PostCount>
                  </St.CalendarContentsContainer>
                </>
              );
            }
            return null;
          }}
        />
        <St.CurrentDate>
          <IoCalendarClearOutline />
          현재 날짜 {dayjs(date).format('YYYY년 MM월 DD일')}
        </St.CurrentDate>
      </St.StyleCalendar>
    </St.CalendarWrapper>
  );
};

export default HabitCalendar;
