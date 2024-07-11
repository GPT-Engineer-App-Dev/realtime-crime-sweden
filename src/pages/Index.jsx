// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl">Real-Time Crime Reports</h1>
      <div id="crime-list-placeholder">
        {/* Crime list component will be inserted here */}
        <a href="/crime-list" className="text-blue-500 underline">
          Go to Crime List
        </a>
      </div>
    </div>
  );
};

export default Index;
