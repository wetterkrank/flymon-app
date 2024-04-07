import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  Text,
  VStack,
} from "@gluestack-ui/themed";

type AutocompleteProps = { open: boolean, setOpen: (open: boolean) => void };

const Autocomplete = ({ open, setOpen }: AutocompleteProps) => {
  return (
    <Actionsheet isOpen={open} onClose={() => setOpen(false)} zIndex={999} snapPoints={[50]}>
      <ActionsheetBackdrop />
      <ActionsheetContent h="$72" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack>
          <Text>HELLOWRDL</Text>
        </VStack>
        {/* <ActionsheetItem onPress={setShow}>
          <ActionsheetItemText>Delete</ActionsheetItemText>
        </ActionsheetItem> */}
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default Autocomplete;
