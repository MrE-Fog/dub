import {
  Body,
  Link,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { DUB_LOGO } from "../lib/constants";

export default function InvalidDomain({
  domain = "dub.sh",
  projectName = "Dub",
  projectSlug = "dub",
  invalidDays = 14,
}: {
  domain: string;
  projectName: string;
  projectSlug: string;
  invalidDays: number;
}): JSX.Element {
  return (
    <Html>
      <Head />
      <Preview>Invalid Domain Configuration</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_LOGO}
                width="40"
                height="40"
                alt="Dub"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Invalid Domain Configuration
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Your domain <code className="text-purple-600">{domain}</code> for
              your Dub project{" "}
              <Link
                href={`https://app.dub.sh/${projectSlug}`}
                className="font-medium text-blue-600 no-underline"
              >
                {projectSlug}↗
              </Link>{" "}
              has been invalid for {invalidDays} days.
            </Text>
            <Text className="text-sm leading-6 text-black">
              If your domain remains unconfigured for 30 days, it will be
              automatically deleted from Dub. Please click the link below to
              configure your domain.
            </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.sh/${projectSlug}/domains`}
              >
                Configure domain
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              If you do not want to keep this domain on Dub, you can{" "}
              <Link
                href={`https://app.dub.sh/${projectSlug}/domains`}
                className="font-medium text-blue-600 no-underline"
              >
                delete it
              </Link>{" "}
              or simply ignore this email. To respect your inbox,{" "}
              {invalidDays < 28
                ? `we will only send you one more email about this in ${
                    28 - invalidDays
                  } days.`
                : "this will be the last time we will email you about this."}
            </Text>
            <Hr className="mx-0 my-6 w-full border border-gray-200" />
            <Text className="text-[12px] leading-6 text-gray-500">
              This email was intended for members of the{" "}
              <span className="text-black">{projectName}</span> project on Dub.
              If you were not expecting this email, you can ignore this email.
              If you are concerned about your account's safety, please reply to
              this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
