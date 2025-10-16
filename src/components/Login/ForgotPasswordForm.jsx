import useLoginStore from "../../store/loginStore";
import imageMap from "../../utils/imageMap";

const ForgotPasswordForm = () => {
  const handleForgotPassword = useLoginStore((s) => s.handleForgotPassword);
  const setState = useLoginStore((s) => s.setState);
  const forgotPasswordUI = useLoginStore((s) => s.forgotPasswordUI);
  const forgotUsername = useLoginStore((s) => s.forgotUsername);
  const loading = useLoginStore((s) => s.loading);

  // console.log("forgot password form rendered");

  return (
    forgotPasswordUI && (
      <form
        className="relative flex flex-col gap-6 items-stretch "
        onSubmit={(e) => {
          e.preventDefault();
          handleForgotPassword();
        }}
      >
        <div
          className="absolute top-0 left-0 rounded-sm py-1 px-2 bg-blue-800 font-medium hover-effect"
          onClick={() =>
            setState({ forgotPasswordUI: false, forgotUsername: "" })
          }
        >
          {"<"}
        </div>

        <div className="flex justify-center items-center">
          <img src={imageMap.xymaWhite} className="max-w-[110px]" />
        </div>

        <div className="text-center text-xl font-medium">Password Reset</div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username2">Username</label>
          <input
            type="email"
            id="username2"
            value={forgotUsername}
            required
            onChange={(e) => setState({ forgotUsername: e.target.value })}
            className="bbb p-1 rounded-sm"
          />
        </div>

        <button
          className={`button-style-2 ${
            loading && "opacity-80 cursor-not-allowed hover:scale-100"
          }`}
          disabled={loading}
        >
          {!loading ? "Request Password Reset" : "loading..."}
        </button>
      </form>
    )
  );
};

export default ForgotPasswordForm;
