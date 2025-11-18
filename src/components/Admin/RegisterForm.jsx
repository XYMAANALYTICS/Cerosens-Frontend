import useAdminStore from "../../store/adminStore";

const RegisterForm = () => {
  const Name = useAdminStore((s) => s.Name);
  const Email = useAdminStore((s) => s.Email);
  const Password = useAdminStore((s) => s.Password);
  const Role = useAdminStore((s) => s.Role);
  const setState = useAdminStore((s) => s.setState);
  const addCredential = useAdminStore((s) => s.addCredential);

  // form input mapping
  const formInputs = [
    { label: "Username", value: Name, key: "Name", type: "text" },
    { label: "Email", value: Email, key: "Email", type: "text" },
    { label: "Password", value: Password, key: "Password", type: "password" },
  ];

  // role mapping
  const roles = [
    { label: "User", role: "user" },
    { label: "Admin", role: "admin" },
    { label: "Super-admin", role: "superAdmin" },
  ];

  // console.log("register form rendered");

  return (
    <form
      className="rounded-xl border border-[#bae9bc] p-4 flex text-[8px] md:text-[10px] 2xl:text-[12px] flex-col gap-4 whitespace-nowrap card-bg heading-txt-color"
      onSubmit={(e) => {
        e.preventDefault();
        addCredential();
      }}
    >
      <h1 className="text-center">Register users</h1>

      {formInputs.map(({ label, value, key, type }) => (
        <div key={key} className="flex items-center">
          <label className="w-1/2">Enter {label}</label>
          <input
            type={type}
            className="in-field w-1/2"
            required
            value={value}
            onChange={(e) => setState({ [key]: e.target.value })}
          />
        </div>
      ))}

      <div className="flex items-center gap-4">
        <label>Select Role</label>

        {roles.map(({ label, role }) => (
          <label className="flex items-center gap-1 hover-effect" key={role}>
            <input
              type="radio"
              required
              name="userRole"
              value={role}
              checked={Role === role}
              onChange={(e) => setState({ Role: e.target.value })}
            />
            <div>{label}</div>
          </label>
        ))}
      </div>

      <button className="bbb p-1 rounded-md hover-effect" type="submit">
        Add Credential
      </button>
    </form>
  );
};

export default RegisterForm;
