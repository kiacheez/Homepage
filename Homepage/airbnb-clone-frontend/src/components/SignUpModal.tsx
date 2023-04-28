import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaUserCircle, FaLock, FaEnvelope, FaUserAlt } from "react-icons/fa";
import { usernameSignup } from "../api";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SForm {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(usernameSignup, {
    onMutate: () => {
      console.log("mutation start");
    },
    onSuccess: () => {
      toast({
        title: "회원가입",
        status: "success",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
  });
  const onSubmit = ({ name, username, email, password }: SForm) => {
    mutation.mutate({ name, username, email, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                {...register("name", { required: true })}
                variant={"filled"}
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register("email", { required: true })}
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserCircle />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", { required: true })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", { required: true })}
                type="password"
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color={"red.500"} textAlign="center" fontSize={"md"}>
              입력하신 내용을 확인해주세요.
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"red"}
            w="100%"
          >
            회원가입하기
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
