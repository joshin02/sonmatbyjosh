function Aichat() {


  return (
    <div className="chat-container">
      <h1>AI Chat</h1>
      {/* Render the LangFlow chat component */}
      <langflow-chat
        window_title="EatsByJoshChatBot"
        flow_id="2b6c63d8-75c1-4c06-9aee-4433c2a49402"
        host_url="http://localhost:7868">
      </langflow-chat>
    </div>
  );
}

export default Aichat;