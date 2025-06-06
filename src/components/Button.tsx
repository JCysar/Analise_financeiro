import { ComponentProps } from "react";

import { Button as GluestackButton, Text, ButtonSpinner } from "@gluestack-ui/themed";




type Props = ComponentProps<typeof GluestackButton> & {
    title: string
    variant?: "solid" | "outline"
    isLoading?: boolean

}




export function Button({ title,variant="solid", isLoading, ...rest }: Props) {
    return (
        
        <GluestackButton{...rest}

            w="$full"
            h="$14"
            bg={variant==="outline"?"transparent":"$green700"}
            borderWidth={variant ==="outline" ? "$1": "$0"}
            borderColor="$green500"
            rounded="$sm"
            $active-backgroundColor={ variant ==="outline" ? "$gray500" : "$green500"}
            disabled={isLoading}

            {...rest}


        >
            {
                isLoading ? (

                    <ButtonSpinner color="$white" />

                ) : (

                    <Text color={ variant ==="outline" ? "$green500" : "$gray600"}>

                        {title}

                    </Text>

                )}

        </GluestackButton>

    )
}