import { Box } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Bottom from "./Bottom";
import Header from "./Header";

export default function Root() {
  return (
    <Box>
      <Header />
      <Outlet />
      <Bottom />
      <ReactQueryDevtools />
    </Box>
  );
}
