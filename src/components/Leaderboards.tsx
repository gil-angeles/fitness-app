import { topPerformersData } from "../data/topPerformers";

const medalIcons = ["/gold.svg", "/silver.svg", "/bronze.svg"];

//Leaderboard component that displays top performers, hardcoded data used
const Leaderboards = () => {
  return (
    <div className="bg-[#323232] text-white rounded-lg p-4 w-full max-w-sm">
      <div className="flex flex-col items-center mb-4">
        <img src="/trophy.svg" alt="Trophy" className="w-16 h-16 mb-2" />
        <h1 className="text-lg font-semibold">Leaderboards</h1>
      </div>

      {topPerformersData.map(({ title, performers }, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-white font-medium text-left mb-2">{title}</h2>
          <ul className="space-y-1">
            {[...performers]
              .sort((a, b) => b.progress - a.progress)
              .map((performer, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 animate-fade-in opacity-0"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {i < 3 ? (
                    <img
                      src={medalIcons[i]}
                      alt={`Place ${i + 1}`}
                      className="w-4 h-4"
                    />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                  <span className="flex-1">{performer.name}</span>
                  <span className="text-sm text-gray-300">
                    {performer.progress}%
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Leaderboards;
