export function SystemInfoCard() {
  return (
    <div className="meta-grid">
      <div className="meta-item">
        <span className="meta-label">系统名称</span>
        <span className="meta-value">示例系统</span>
      </div>
      <div className="meta-item">
        <span className="meta-label">英文名称</span>
        <span className="meta-value">Example System</span>
      </div>
      <div className="meta-item">
        <span className="meta-label">组织</span>
        <span className="meta-value">示例组织</span>
      </div>
      <div className="meta-item">
        <span className="meta-label">版本</span>
        <span className="meta-value">1.0.0</span>
      </div>
      <div className="meta-item">
        <span className="meta-label">技术栈</span>
        <span className="meta-value">React + Vite + Ant Design</span>
      </div>
    </div>
  );
}
