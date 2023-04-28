import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBed, FaToilet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAmenities,
  getCategories,
  IModifyRoomVariables,
  modifyRoom,
} from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IAmenity, ICategory, IRoomDetail } from "../types";

export default function ModifyRoom() {
  const { register, handleSubmit } = useForm<IModifyRoomVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(modifyRoom, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: "success",
        title: "방이 변경되었습니다.",
        position: "top",
      });
      navigate(`/rooms/${data.id}`);
    },
  });
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);

  const onSubmit = (data: IModifyRoomVariables) => {
    mutation.mutate(data);
  };

  useHostOnlyPage();

  return (
    <ProtectedPage>
      <Box>
        <Container mb={"5%"}>
          <Heading textAlign={"center"}>Change Room</Heading>
          <VStack
            spacing={7}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register("name", { required: true })} type="text" />
              <FormHelperText>방이름을 입력하세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input {...register("country", { required: true })} type="text" />
              <FormHelperText>호스팅하는 국가를 입력하세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input {...register("city", { required: true })} type="text" />
              <FormHelperText>도시 이름을 입력하세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input {...register("address", { required: true })} type="text" />
              <FormHelperText>주소를 입력하세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children="￦원" />
                <Input
                  {...register("price", { required: true })}
                  type="number"
                  min={0}
                />
              </InputGroup>
              <FormHelperText>가격을 입력하세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register("rooms", { required: true })}
                  type="number"
                  min={0}
                />
              </InputGroup>
              <FormHelperText>방 갯수를 입력하세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  type="number"
                  min={0}
                />
              </InputGroup>
              <FormHelperText>화장실 갯수를 입력하세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea {...register("description", { required: true })} />
            </FormControl>
            <FormControl>
              <Checkbox>Pet friendly</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>kind of room</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="choose a kind"
              >
                <option value="entire_place">Entire Place</option>
                <option value="private_place">Private Room</option>
                <option value="shared_room">Shared Room</option>
              </Select>
              <FormHelperText>
                what kind of room are you looking for?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="choose a kind"
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                what category describes your room?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox
                      value={amenity.pk}
                      {...register("amenities", { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.isError
              ? "{mutation.error} check your information"
              : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"red"}
              size="lg"
              w="100%"
            >
              Edit Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
