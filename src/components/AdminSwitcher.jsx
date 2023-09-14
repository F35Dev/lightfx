import cn from "classnames";
import { useState } from "react";
import { startTransition } from "react";
import { useEffect } from "react";
import AdminUsersList from "./AdminUsersList";
import WithdrawalsList from "./Withdrawals";
import CreditUser from "./CreditUser";

function AdminSwitcher({ user }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const url = new URL(location.href, location.origin);

    if (url.searchParams.has("v")) {
      const l = ["0", "1", "2"];
      const v = url.searchParams.get("v");

      if (!l.includes(v)) {
        return;
      }

      if (active !== +v) {
        startTransition(() => {
          setActive(+v);
        });
      }
    }
  }, []);

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
            "text-base  lg:text-lg cursor-pointer border-b inline-block pb-1 " +
            cn({
              " text-white/40  border-white/20 hover:text-white/60 hover:border-white/40 transition-flow  ":
                active !== 0,
              " text-white border-white ": active == 0,
            })
          }
        >
          Users
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
          Withdrawals
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
          Credit a user
        </h3>
      </div>

      <div
        className={cn({
          " block ": active === 0,
          " hidden ": active !== 0,
        })}
      >
        <AdminUsersList authUser={user} />
      </div>

      <div
        className={cn({
          " block ": active === 1,
          " hidden ": active !== 1,
        })}
      >
        <WithdrawalsList authUser={user} />
      </div>

      <div
        className={cn({
          " block ": active === 2,
          " hidden ": active !== 2,
        })}
      >
        <CreditUser />
      </div>
    </div>
  );
}

export default AdminSwitcher;
