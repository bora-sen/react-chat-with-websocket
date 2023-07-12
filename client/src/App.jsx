import { Box, Button, Card, CardBody, CardHeader, Container, Heading, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ChatLog } from "./components"

function App({ connectionObj }) {
  const toast = useToast()
  const [isConnected, setIsConnected] = useState(connectionObj.connected)
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [localChatLog, setLocalChatLog] = useState([{ sender: "System", body: "Welcome to Chat, start messaging." }])

  useEffect(() => {
    connectionObj.connect()
    connectionObj.on("connect", () => {
      setIsConnected(true)
    })
    connectionObj.on("disconnect", () => {
      setIsConnected(false)
    })

    return () => {
      connectionObj.off("connect", () => {
        setIsConnected(true)
      })
      connectionObj.off("disconnect", () => {
        setIsConnected(false)
      })
    }
  }, [])
  useEffect(() => {
    connectionObj.on("recieve-message", (msg) => setLocalChatLog([...localChatLog, msg]))
  }, [connectionObj, localChatLog])

  function handleSetUsername(e) {
    e.preventDefault()
    setUsername(document.getElementById("username_input").value)
  }
  function handleEmit(e) {
    e.preventDefault()

    if (username === "") {
      toast({
        title: "You need to enter Username!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      })
    }

    let messageObj = {
      sender: username,
      body: message,
    }
    if (isConnected && message !== "") {
      connectionObj.emit("message", messageObj)
      document.getElementById("message_input").value = ""
      setMessage("")
      document.getElementById("chatlog").scrollTop = document.getElementById("chatlog").scrollHeight
    }
  }

  return (
    <Container textColor="#1b2d45" maxWidth="full" height="100dvh" backgroundColor="#FAF0D7" display="flex" justifyContent="center" alignItems="center">
      <Card backgroundColor="#FFD9C0">
        <CardHeader>
          <Heading>Welcome to React Chat With Websocket</Heading>
          <InputGroup>
            <Input disabled={username !== "" ? true : false} id="username_input" type="text" />
            <Button onClick={(e) => handleSetUsername(e)}>Set Username</Button>
          </InputGroup>
        </CardHeader>
        <CardBody>
          <Box display="flex">
            <ChatLog chat={localChatLog} username={username} />
          </Box>
          <InputGroup>
            <Input
              onChange={(e) => {
                setMessage(e.target.value)
              }}
              type="text"
              id="message_input"
              name="message_input"
              border="2px"
            />
            <InputRightElement>
              <Button
                onClick={(e) => {
                  handleEmit(e)
                }}
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </CardBody>
      </Card>
    </Container>
  )
}

export default App
