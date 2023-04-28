import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Bottom() {
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
      borderTopWidth={1}
      borderTopColor={"gray.200"}
    >
      <Box>
        <Container
          as={Stack}
          py={1}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © 2023 주식회사 농업회사법인 디엠지플러스 All rights reserved
          </Text>
          <Stack direction={"row"} spacing={6}></Stack>
        </Container>
      </Box>
    </Stack>
  );
}
