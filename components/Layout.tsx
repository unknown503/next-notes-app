import Head from 'next/head'

interface WrapperProps {
    children: React.ReactNode;
}

export default function Layout({ children }: WrapperProps) {
    return (
        <>
            <Head>
                <title>My stuff</title>
                <meta name="description" content="Notes app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </>
    )
}
