const { Children } = require("react");

const LandingPageLayout = ({ children }) => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">
            {children}
        </div>
    </main>
    );
};
export default LandingPageLayout;