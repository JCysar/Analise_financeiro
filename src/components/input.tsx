import { Input as GluestackInput, InputField } from "@gluestack-ui/themed"
import { ComponentProps } from "react"


type Props = ComponentProps<typeof InputField>


export function Input({ ...rest }: Props) {

    return (
        <GluestackInput
            bg="#FFF"
            h="$14"
            px="$4"
            borderWidth={1}
            borderColor="#DDD"
            borderRadius={0}
            overflow="hidden"
            $focus={{
                borderWidth: 1,
                borderColor: "#FF9100",
            }}
        >
            <InputField  
                color="#222"
                fontFamily="$body"
                placeholderTextColor="#888"
                {...rest} />
        </GluestackInput>
    )


}