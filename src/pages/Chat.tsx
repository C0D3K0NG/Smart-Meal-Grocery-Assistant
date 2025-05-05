
import { useState, useRef, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { useApp } from "@/contexts/AppContext";
import ChatMessage from "@/components/ChatMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Send } from "lucide-react";
import { mockChatResponses } from "@/data/mockData";

const Chat = () => {
  const { chatHistory, addChatMessage } = useApp();
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);
  
  // Initialize chat with welcome message if empty
  useEffect(() => {
    if (chatHistory.length === 0) {
      const randomGreeting = mockChatResponses.greetings[
        Math.floor(Math.random() * mockChatResponses.greetings.length)
      ];
      
      addChatMessage({
        role: "assistant",
        content: randomGreeting
      });
    }
  }, [chatHistory.length, addChatMessage]);
  
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    // Add user message
    addChatMessage({
      role: "user",
      content: message
    });
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      // Simple keyword matching for the demo
      if (message.toLowerCase().includes("recipe") || message.toLowerCase().includes("cook")) {
        response = mockChatResponses.recipeIdeas[
          Math.floor(Math.random() * mockChatResponses.recipeIdeas.length)
        ];
      } else if (message.toLowerCase().includes("nutrition") || message.toLowerCase().includes("healthy")) {
        response = mockChatResponses.nutritionInfo[
          Math.floor(Math.random() * mockChatResponses.nutritionInfo.length)
        ];
      } else {
        response = "I can help you with recipe ideas, nutrition information, and managing your kitchen inventory. What would you like to know?";
      }
      
      addChatMessage({
        role: "assistant",
        content: response
      });
    }, 1000);
    
    setMessage("");
  };
  
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  return (
    <AppLayout title="AI Assistant">
      <Card className="h-[calc(100vh-12rem)]">
        <CardContent className="p-0 h-full flex flex-col">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4"
          >
            {chatHistory.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                className="flex-shrink-0"
              >
                <Mic className="h-5 w-5" />
              </Button>
              
              <Input 
                placeholder="Ask anything about your kitchen or meal ideas..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              
              <Button 
                className="flex-shrink-0"
                onClick={handleSendMessage}
                disabled={message.trim() === ""}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Chat;
