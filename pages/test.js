import React from "react";
import unflatten from "unflatten";

export default () => {
  const [json, setJson] = React.useState("{}");
  const [result, setResult] = React.useState("");
  React.useEffect(() => {
    console.log(JSON.parse(json));
    setResult(unflatten(JSON.parse(json)));
  }, [json]);
  React.useEffect(() => {
    navigator.clipboard.writeText(JSON.stringify(result)).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }, [result]);
  return (
    <div className={`test`}>
      <input
        type="text"
        name="json"
        onChange={(e) => setJson(e.target.value)}
      />
      <pre style={{ color: "white" }}>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};
