function PostsList() {
  const [posts, setPosts] = React.useState([]);        
  const [loading, setLoading] = React.useState(true);  
  const [error, setError] = React.useState(null);      

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://jsonplaceholder.typicode.com/posts"); 
        if (!response.ok) {
          throw new Error("Failed to fetch posts. Status: " + response.status);
        }

        const data = await response.json();
        setPosts(data.slice(0, 5)); 
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();  
  }, []);

  return (
    <div className="container">
      <h2>Posts from API</h2>

      {/* loading state */}
      {loading && <div className="loading">Loading posts...</div>}

      {/* error state */}
      {error && !loading && <div className="error">Error: {error}</div>}

      {/* data list */}
      {!loading && !error && posts.length > 0 && (
        <div>
          {posts.map(post => (
            <div key={post.id} className="post">
              <div className="title">{post.title}</div>
              <div>{post.body}</div>
            </div>
          ))}
        </div>
      )}

      {/* empty state */}
      {!loading && !error && posts.length === 0 && (
        <div>No posts found.</div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PostsList />);