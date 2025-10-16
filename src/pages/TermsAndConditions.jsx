import axiosInstance from "../lib/axiosInterceptor";
import imageMap from "../utils/imageMap";
import iconMap from "../utils/iconMap";

import useProtectedRouteStore from "../store/protectedRouteStore";
import useLogout from "../hooks/useLogout";

const TermsAndConditions = () => {
  const logout = useLogout();

  const userEmail = useProtectedRouteStore((s) => s.userEmail);
  const userName = useProtectedRouteStore((s) => s.userName);

  // accept tc api
  const acceptTC = async () => {
    try {
      const response = await axiosInstance.post("/acceptTC", {
        userEmail,
        userName,
      });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("acceptTC error catched!");
    }
  };

  return (
    <div className="min-h-screen xl:h-screen p-4 flex flex-col">
      <div className="h-[8%]">
        <img
          src={imageMap.xymaBlue}
          className="max-w-[80px] 2xl:max-w-[100px]"
        />
      </div>

      <div className="h-[92%] flex justify-center items-center">
        <div className="h-[60%] w-[40%] p-4 flex flex-col gap-4 bg-stone-100 rounded-sm">
          <div className="flex items-center justify-center text-xl font-medium gap-4">
            <iconMap.GrDocumentText className="text-6xl" />
            Terms and Conditions
          </div>

          <div
            className="space-y-4 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#E0E3F6 transparent",
            }}
          >
            <section>
              <h3 className="font-semibold text-lg text-gray-900">
                User Monitoring & Activity Logging
              </h3>
              <p className="whitespace-normal">
                We monitor and record user interactions on this dashboard,
                including but not limited to:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Login and logout timestamps</li>
                <li>Initiation of processes or operations</li>
                <li>Report generation and download activity</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900">
                Location and IP Tracking
              </h3>
              <p className="whitespace-normal">
                We collect and store information about your access location and
                IP address for:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Security auditing</li>
                <li>Usage analytics</li>
                <li>Fraud prevention and accountability</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900">
                Data Usage and Storage
              </h3>
              <p className="whitespace-normal">
                All collected data is stored securely and used solely for
                operational, analytical, and security purposes. We do not sell
                or share your data with third parties without your explicit
                consent, unless required by law.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900">
                User Responsibility
              </h3>
              <p className="whitespace-normal">
                Users are responsible for maintaining the confidentiality of
                their login credentials. Any action performed under a logged-in
                account will be considered as performed by the account owner.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900">Consent</h3>
              <p className="whitespace-normal">
                By continuing to use this dashboard, you consent to the above
                practices.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg text-gray-900">
                Policy Changes
              </h3>
              <p className="whitespace-normal">
                We reserve the right to update these terms at any time. Users
                will be notified of any significant changes.
              </p>
            </section>
          </div>

          <div className="flex justify-end items-center gap-4">
            <button className="button-style-1" onClick={logout}>
              Decline
            </button>

            <button className="button-style-1" onClick={acceptTC}>
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
