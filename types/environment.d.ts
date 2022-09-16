export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_SB_URL: string;
            NEXT_PUBLIC_SB_ANON_KEY: string;
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}
