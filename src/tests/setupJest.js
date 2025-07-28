console.log("Jest setup file loaded");

// Mock Webpack's require.context so Jest doesn't crash
if (typeof require.context === "undefined") {
  require.context = () => {
    const mockFn = () => {};
    mockFn.keys = () => [];
    return mockFn;
  };
}
