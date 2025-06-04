import ChallengesAvailable from "../components/ChallengesAvailable";

const Home = () => {
  return (
    <div className="p-6">
      <p className="text-lg pb-6">Available challenges</p>
      <ChallengesAvailable />
    </div>
  );
};

export default Home;
