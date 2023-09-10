import cn from "classnames";
import ProfileForm from "./ProfileForm";
import { useState } from "react";
import { FcEmptyTrash } from "react-icons/fc";
import Profile from "./Profile";

function SettingsActions({ user }) {
  const [active, setActive] = useState(1);

  function selectActive(n) {
    return () => {
      setActive(n);
    };
  }

  return (
    <div className="col-span-6 lg:col-span-4 bg-bg3 py-4 px-4 rounded-md">
      <div className="flex flex-row justify-start space-x-4 items-center overflow-x-auto">
        <h3
          onClick={selectActive(0)}
          className={
            "text-base lg:hidden lg:text-lg cursor-pointer border-b inline-block pb-1 " +
            cn({
              " text-white/40  border-white/20 hover:text-white/60 hover:border-white/40 transition-flow  ":
                active !== 0,
              " text-white border-white ": active == 0,
            })
          }
        >
          Profile
        </h3>

        <h3
          onClick={selectActive(1)}
          className={
            "text-base cursor-pointer lg:text-lg border-b inline-block pb-1 " +
            cn({
              " text-white/40  border-white/20 hover:text-white/60 hover:border-white/40 transition-flow ":
                active !== 1,
              " text-white border-white ": active == 1,
            })
          }
        >
          Edit profile
        </h3>
        <h3
          onClick={selectActive(2)}
          className={
            "text-base lg:text-lg cursor-pointer  border-b inline-block pb-1 " +
            cn({
              " text-white/40  border-white/20 hover:text-white/60 hover:border-white/40 transition-flow":
                active !== 2,
              " text-white border-white ": active == 2,
            })
          }
        >
          Notifications
        </h3>
      </div>

      <div
        className={cn({
          " block ": active === 0,
          " hidden ": active !== 0,
        })}
      >
        <Profile />
      </div>

      <div
        className={cn({
          " block ": active === 1,
          " hidden ": active !== 1,
        })}
      >
        <ProfileForm />
      </div>

      <div
        className={cn({
          " block ": active === 2,
          " hidden ": active !== 2,
        })}
      >
        {user.notifications.filter((c) => !c.isRead).length < 1 && (
          <div className="flex flex-col justify-center items-center py-6">
            <p className="text-center text-white/80 text-lg py-6">
              {" "}
              No notifications
              <br />
            </p>
            <FcEmptyTrash className="text-4xl" />
          </div>
        )}

        {user.notifications.filter((c) => !c.isRead).length > 0 && (
          <div className="min-h-full overflow-x-auto">
            {user.notifications
              .filter((c) => !c.isRead)
              .map((c) => (
                <div className="flex flex-row justify-between items-center py-4 border-b border-white/10">
                  <div className="flex flex-col justify-center items-start space-y-2">
                    <p className="text-white text-sm"> {c.message} </p>

                    <p className="text-white/80 text-xs">
                      {" "}
                      {new Date(c.date).toDateString()}{" "}
                    </p>

                    <div className="flex flex-row justify-between items-center w-full">
                      <button className="text-green-500/80 text-sm hover:text-green-500 transition-flow">
                        {" "}
                        Mark as read{" "}
                      </button>

                      <button className="text-red-500/80 text-sm hover:text-red-500 transition-flow">
                        {" "}
                        Delete{" "}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsActions;
