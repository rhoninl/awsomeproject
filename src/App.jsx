import React, { useState, useEffect } from 'react';

export default function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserData = async (user) => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch user profile
      const userRes = await fetch(\`https://api.github.com/users/\${user}\`);
      if (!userRes.ok) throw new Error('User not found');
      const userData = await userRes.json();
      setUserData(userData);

      // Fetch repositories (sorted by updated)
      const reposRes = await fetch(\`https://api.github.com/users/\${user}/repos?sort=updated&per_page=5\`);
      const reposData = await reposRes.json();
      setRepos(reposData);

      // Fetch recent events
      const eventsRes = await fetch(\`https://api.github.com/users/\${user}/events/public?per_page=10\`);
      const eventsData = await eventsRes.json();
      setEvents(eventsData);
    } catch (err) {
      setError(err.message);
      setUserData(null);
      setRepos([]);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchUserData(username.trim());
    }
  };

  const getEventDescription = (event) => {
    switch (event.type) {
      case 'PushEvent':
        return \`Pushed \${event.payload.commits?.length || 0} commit(s) to \${event.repo.name}\`;
      case 'PullRequestEvent':
        return \`\${event.payload.action} pull request in \${event.repo.name}\`;
      case 'IssuesEvent':
        return \`\${event.payload.action} issue in \${event.repo.name}\`;
      case 'CreateEvent':
        return \`Created \${event.payload.ref_type} in \${event.repo.name}\`;
      case 'ForkEvent':
        return \`Forked \${event.repo.name}\`;
      case 'WatchEvent':
        return \`Starred \${event.repo.name}\`;
      default:
        return event.type.replace('Event', '');
    }
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          🚀 GitHub Tracker
        </h1>
        <p className="text-white/80 text-lg">
          Track your open source contributions
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username..."
            className="flex-1 px-6 py-4 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
          >
            {loading ? 'Loading...' : 'Track'}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-300 text-white px-6 py-4 rounded-2xl mb-6">
          ❌ {error}
        </div>
      )}

      {/* Results */}
      {userData && (
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-3xl p-8">
            <div className="flex items-start gap-6">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="w-24 h-24 rounded-full border-4 border-white/50"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {userData.name || userData.login}
                </h2>
                <p className="text-white/70 mb-4">@{userData.login}</p>
                {userData.bio && (
                  <p className="text-white/90 mb-4">{userData.bio}</p>
                )}
                <div className="flex gap-6 text-white/80">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userData.public_repos}</div>
                    <div className="text-sm">Repos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userData.followers}</div>
                    <div className="text-sm">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userData.following}</div>
                    <div className="text-sm">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Repositories */}
          {repos.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">📦 Recent Repositories</h3>
              <div className="space-y-4">
                {repos.map(repo => (
                  <div key={repo.id} className="bg-white/10 rounded-2xl p-5 hover:bg-white/20 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-semibold text-white hover:underline"
                        >
                          {repo.name}
                        </a>
                        {repo.description && (
                          <p className="text-white/70 mt-2">{repo.description}</p>
                        )}
                        <div className="flex gap-4 mt-3 text-sm text-white/60">
                          {repo.language && (
                            <span>🔹 {repo.language}</span>
                          )}
                          <span>⭐ {repo.stargazers_count}</span>
                          <span>🔀 {repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {events.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">⚡ Recent Activity</h3>
              <div className="space-y-3">
                {events.slice(0, 8).map((event, idx) => (
                  <div key={idx} className="bg-white/10 rounded-xl p-4 text-white/90">
                    <div className="text-sm">{getEventDescription(event)}</div>
                    <div className="text-xs text-white/60 mt-1">
                      {new Date(event.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-12 text-white/60 text-sm">
        Built with React 19 + Rsbuild + Tailwind CSS v4 🤠
      </div>
    </div>
  );
}
