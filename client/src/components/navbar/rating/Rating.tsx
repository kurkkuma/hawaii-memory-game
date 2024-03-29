import "./rating.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";

import { UserType } from "../../../App";

function Rating() {
  const { api, showRating } = useContext(AppContext);
  const [bestPlayers, setBestPlayers] = useState<UserType[] | []>([]);

  useEffect(() => {
    const getBestPlayersDB = async () => {
      const res = await axios.get(`${api.defaults.baseURL}/best-players`);

      setBestPlayers(res.data);
    };
    getBestPlayersDB();
  }, []);

  return (
    <div className={`rating-container ${showRating ? "active" : ""}`}>
      <h1>🏆🌴 Best Players 🌴🏆</h1>
      <ul>
        {bestPlayers.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`top-user-info ${
                index === 0
                  ? "gold-user"
                  : index === 1
                  ? "silver-user"
                  : index === 2
                  ? "copper-user"
                  : ""
              }`}
            >
              <div>
                <span> .{index + 1} </span>
                <span className="nickname-top-user">{item.nickname}</span>
              </div>

              <span> ({item.levelsCompleted} lvls)</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Rating;
