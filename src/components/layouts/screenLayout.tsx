import logo from "@/../public/decentro-logo.svg";
import Image from "next/image";
import { Title } from "@mantine/core";
import useAuthStore from "@/stores/useAuthStore";
import { ReactNode, useEffect } from "react";
import { TbArrowLeft } from "react-icons/tb";
import { useRouter } from "next/router";
import Head from "next/head";

type ScreenlayoutProps = {
  title?: string;
  headerTitle?: string;
  children?: ReactNode;
  enableBackBtn?: boolean;
};

const ScreenLayout = ({
  title,
  headerTitle,
  children,
  enableBackBtn = false,
}: ScreenlayoutProps) => {
  const router = useRouter();
  const { clientId, clientSecret } = useAuthStore();

  useEffect(() => {
    if (router.basePath !== "/" && (!clientId || !clientSecret )) {
        router.push("/");
    }
  }, [clientId, clientSecret]);

  const handleBackBtnPress = () => {
    router.back();
  };
  const showHeader = title || enableBackBtn;

  return (
    <div className="flex flex-col h-screen">
      {headerTitle && (
        <Head>
          <title>{headerTitle}</title>
        </Head>
      )}
      {showHeader && (
        <header className="sticky top-0 bg-white z-50 shadow-sm">
          <div className="w-full flex items-center px-6">
            {enableBackBtn && (
              <div className="flex items-center z-10 -mr-6 md:hidden">
                <TbArrowLeft size={24} onClick={handleBackBtnPress} />
              </div>
            )}
            {
              <Title
                order={1}
                className="text-2xl text-center m-0 p-4 font-medium w-full"
              >
                {title}
              </Title>
            }
          </div>
        </header>
      )}
      <main className="flex-1 px-6">{children}</main>
      <footer className="text-center p-6 align-middle flex items-center gap-1 justify-center sticky bottom-0 bg-white">
        <div className="flex flex-col items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs">
            Powered by
            <Image
              src={logo}
              alt="Logo"
              className="w-24 h-6 xzx ghgb       "
              priority
            />
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ScreenLayout;
