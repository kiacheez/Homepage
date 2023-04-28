import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { checkBooking, deleteRoom, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useUser from "../lib/useUser";

export default function RoomDetail() {
  const { user } = useUser();
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >([`rooms`, roomPk, `reviews`], getRoomReviews);
  const [dates, setDates] = useState<Date[]>();
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ["check", roomPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );
  const navigate = useNavigate();
  const onRoomClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${roomPk}/change`);
    window.location.reload();
  };

  return (
    <Box
      gap={3}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {data?.photos.slice(0, 5).map((photo, index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={photo.pk}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} templateColumns={"2fr 1fr"}>
        <Box>
          <HStack mt={10} width={"75%"} justifyContent={"space-between"}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <Heading fontSize={"2xl"}>
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                  <Text>
                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <HStack>
              {user?.is_host ? (
                <ButtonGroup paddingLeft={"150%"}>
                  <Link to={`/rooms/${roomPk}/change`}>
                    <Button
                      colorScheme="teal"
                      variant={"outline"}
                      onClick={onRoomClick}
                    >
                      수정
                    </Button>
                  </Link>
                  <Link to={`/`}>
                    <Button colorScheme="red" variant={"outline"}>
                      삭제
                    </Button>
                  </Link>
                </ButtonGroup>
              ) : null}
            </HStack>
            <Avatar
              name={data?.owner.name}
              size={"xl"}
              src={data?.owner.avatar}
            />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar /> <Text>{data?.rating}</Text>
                <Text> ● </Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={15} maxW="container.lg" marginX="none">
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar
                        name={review.user.name}
                        src={review.user.avatar}
                        size="md"
                      />
                      <VStack spacing={1} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={2}>
                          <FaStar size="12px" />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box pt={10}>
          <Calendar
            onChange={setDates}
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            selectRange
          />
          <Button
            disabled={!checkBookingData?.ok}
            isLoading={isCheckingBooking}
            w="50%"
            alignItems={"center"}
            mt={5}
            colorScheme={"red"}
          >
            Booking
          </Button>
          {!isCheckingBooking && !checkBookingData?.ok ? (
            <Text color={"red.500"}>다른 날짜를 선택해주세요.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
