import { FC, useState } from "react";

import { Box, Button, Flex } from "@chakra-ui/react";
import { configs } from "shared/content/Content";
import { InTheNewsCard } from "pages/in-the-news/in-the-news-card/InTheNewsCard";
import { ChevronDownIcon, ChevronUpIcon } from "utils/Icons";

const initialCount = 3;
const incrementor = 3;

export const InTheNews: FC = () => {
    const [count, setCount] = useState<number>(initialCount);

    const scrollToElement = (idx: number) => {
        const elementTop = document
            .getElementById(`in-the-news-card-${configs.inTheNews[idx].id}`)
            ?.getBoundingClientRect().top;

        if (elementTop) {
            window.scrollTo({ top: elementTop + window.scrollY - 64, behavior: "smooth" });
        }
    };

    const onShowMore = () => {
        const oldCount = count;
        setCount(count + incrementor);
        setTimeout(() => {
            scrollToElement(oldCount);
        }, 1);
    };

    const onShowLess = () => {
        setCount(initialCount);
        scrollToElement(initialCount);
    };

    return (
        <Box>
            {configs.inTheNews.map((project, idx) => (
                <div key={project.id}>{idx < count && <InTheNewsCard key={project.id} {...project} />}</div>
            ))}
            <Flex justifyContent="center" py="8" display={configs.inTheNews.length > 3 ? "flex" : "none"}>
                {count < configs.inTheNews.length ? (
                    <Button rightIcon={<ChevronDownIcon />} variant="link" onClick={onShowMore}>
                        Show More
                    </Button>
                ) : (
                    <Button rightIcon={<ChevronUpIcon />} variant="link" onClick={onShowLess}>
                        Show Less
                    </Button>
                )}
            </Flex>
        </Box>
    );
};
