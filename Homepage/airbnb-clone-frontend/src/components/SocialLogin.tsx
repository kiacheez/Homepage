import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "4be55897de626a4932f240a00f2c0759",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParams).toString();

  return (
    <Box mb={2}>
      <HStack mt={2}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray.500" as="b" fontSize="xs">
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=b3d0f2a87529c4a55fb1&scope=read:user,user:email"
          w="100%"
          leftIcon={<FaGithub />}
          colorScheme={"gray"}
        >
          Continue with Github
        </Button>
        <Button
          as="a"
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w="100%"
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
