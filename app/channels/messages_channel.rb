class MessagesChannel < ApplicationCable::Channel  
  def subscribed
    stream_from 'messages'
  end

  def receive(payload)
    message = Message.create(user: current_user, chatroom_id: payload["chatroom_id"], content: payload["message"])
    ActionCable.server.broadcast("messages", message)
  end

end  
