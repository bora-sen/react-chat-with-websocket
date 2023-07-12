import { Box, Text } from "@chakra-ui/react"
import React from "react"

function ChatLog({ chat, username }) {
  return (
    <Box id="chatlog" display="block" minW="full" h="18rem" overflowY="scroll" overscroll="revert" backgroundColor="#8CC0DE" marginBottom="3">
      {chat.map((msg, index) => {
        return (
          <Box marginY="2" key={index} display="flex flex-col" padding="2">
            <Box backgroundColor="blue.300" display={username === msg.sender ? "none" : "inline"}>
              <Text marginLeft="2" marginBottom="1" fontSize="sm">
                {msg.sender}
              </Text>
            </Box>
            <Box display="flex" justifyContent={username === msg.sender ? "end" : "start"}>
              <Text paddingY="2" paddingX="4" rounded="2xl" backgroundColor={username === msg.sender ? "#FAF0D7" : "#CCEEBC"}>
                {msg.body}
              </Text>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default ChatLog
