export function HomePage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">系统信息</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">系统名称</span>
              <span className="meta-value">System Name</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">英文名称</span>
              <span className="meta-value">English Name</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">组织</span>
              <span className="meta-value">Organization Name</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">版本</span>
              <span className="meta-value">1.0.0</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">技术栈</span>
              <span className="meta-value">React + Vite + Ant Design + Spring Boot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
