import { useContext } from "react";
import {
  Box,
  Text,
  HStack,
  Pressable,
  VStack,
  Center,
} from "@gluestack-ui/themed";

import { Subscription } from "../api/subscriptions/types";
import { LocationsContext } from "../services/locations";

export type SubscriptionCardProps = {
  data: Subscription;
  handlePress: (id: number | undefined) => void;
};

export const SubscriptionCard = ({
  data,
  handlePress,
}: SubscriptionCardProps) => {
  const { airports, cities } = useContext(LocationsContext);

  const destination = data.search.destination;
  const result = data.search.lastResult;
  const price = result ? `${result.currency} ${result.price}` : "...";

  const airport_name = airports[destination]?.name;
  const city_name = cities[destination]?.name;

  return (
    <Pressable
      onPress={() => handlePress(data.id)}
      borderBottomWidth="$1"
      borderColor="$trueGray200"
      $dark-borderColor="$trueGray100"
      $base-pl="$4"
      $base-pr="$5"
      py="$2"
    >
      <HStack space="md" justifyContent="flex-start">
        <Box bg="$primary500">
          <Center h={60} w={60}>
            <Text fontWeight="$bold" color="$white">
              {destination}
            </Text>
          </Center>
        </Box>

        <VStack justifyContent="space-evenly">
          <Text
            color="$coolGray800"
            fontWeight="$bold"
            $dark-color="$warmGray100"
          >
            {airport_name || city_name}
          </Text>
          <Text color="$coolGray600" $dark-color="$warmGray200">
            {price}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};
