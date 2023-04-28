import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  ToastId,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logOut } from "../api";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useRef } from "react";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onClose: onSignupClose,
    onOpen: onSignupOpen,
  } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const queryClient = useQueryClient();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "로그아웃",
        description: "로그아웃 되었습니다.",
        status: "success",
        position: "top",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(["me"]);
        toast.update(toastId.current, {
          status: "success",
          title: "로그아웃",
        });
      }
    },
  });
  const onLogOut = async () => {
    mutation.mutate();
  };
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems="center"
      py={7}
      px={5}
      spacing={{
        sm: 4,
        md: 0,
      }}
      direction={{
        sm: "column",
        md: "row",
      }}
      borderBottomWidth={1}
      borderBottomColor={"gray.200"}
    >
      <Box px="40">
        <Link to={"/"}>
          <Image w="150px" h="50px" src="images/dmz_logo.png" alt="logo" />
        </Link>
      </Box>
      <HStack spacing={2}>
        <Stack direction={"row"} spacing={10} mr="20">
          <Link to={"#"}>회사소개</Link>
          <Link to={"#"}>문의하기</Link>
        </Stack>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>로그인</Button>
              <Button onClick={onSignupOpen} colorScheme={"red"}>
                회원가입
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
              </MenuButton>
              <MenuList>
                {user?.is_host ? (
                  <Link to="/rooms/upload">
                    <MenuItem>Upload Room</MenuItem>
                  </Link>
                ) : null}
                <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </Stack>
  );
}
