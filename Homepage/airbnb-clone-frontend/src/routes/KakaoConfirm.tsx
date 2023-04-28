import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogIn } from "../api";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await kakaoLogIn(code);
      if (status === 200) {
        toast({
          status: "success",
          title: "로그인",
          description: "로그인 되었습니다.",
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  });
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing.</Heading>
      <Text>Give me an second</Text>
      <Spinner size="xl" />
    </VStack>
  );
}
