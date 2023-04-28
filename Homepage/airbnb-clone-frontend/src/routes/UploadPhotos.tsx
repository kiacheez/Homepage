import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit } = useForm<IForm>();
  const { roomPk } = useParams();
  const createPhotoMutation = useMutation(createPhoto);

  useHostOnlyPage();

  return (
    <ProtectedPage>
      <Box pb={40} mt={15} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload</Heading>
          <VStack as={"form"} spacing={5} mt={10}>
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*" />
            </FormControl>
            <Button type="submit" w="full" colorScheme={"red"}>
              Upload photo
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
