import Leaderboards from "../components/Leaderboards";
import FriendList from "../components/FriendList";
import LiveUpdates from "../components/LiveUpdates";

const Leaderboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <Leaderboards />
      <div className="flex flex-col gap-6 w-full md:w-[300px]">
        <FriendList />
        <LiveUpdates />
      </div>
    </div>
  );
};

export default Leaderboard;
