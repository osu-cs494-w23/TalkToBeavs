import React from 'react'
import { Heading, Text } from '@chakra-ui/react'

export function TalkToBeavsMobile() {
    return (
        <Heading
            as="h1"
            textTransform="uppercase"
            letterSpacing="tight"
            ml={'32'}
            size="2xl"
            color="orange.500"
        >
            Talk
            <Text as="span" mx={0} color="gray.300">
                2
            </Text>
            Beavs
        </Heading>
    )
}

export default function TalkToBeavs() {
    return (
        <Heading
            as="h1"
            textTransform="uppercase"
            letterSpacing="tight"
            size="2xl"
            color="orange.500"
        >
            Talk
            <Text as="span" mx={0} color="gray.900">
                2
            </Text>
            Beavs
        </Heading>
    )
}
