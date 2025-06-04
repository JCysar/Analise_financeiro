import { Center , Spinner} from "@gluestack-ui/themed";

export function Loading() {

    return (

        
        <Center flex={1} bg="$white500">

            <Spinner color="$red500" />

        </Center>
    )

}