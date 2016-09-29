class MessagesChannel < ApplicationCable::Channel  
  def subscribed
    stream_from 'messages'
  end

  def receive(payload)
    message = Message.create(user: current_user, chatroom_id: payload["chatroom_id"], content: payload["message"])
    messages_html = ApplicationController.renderer.render(partial: 'messages/mesages')
    ActionCable.server.broadcast("messages", messages_html)
  end

end  
