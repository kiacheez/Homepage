import { Heading, Text, VStack, Button } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <VStack>
      <Heading>Page Not Found.</Heading>
      <Text>it seems taht you are lost</Text>
      <Button>Go Home</Button>
    </VStack>
  );
}
