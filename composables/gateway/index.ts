export type GatewayFunction = () => Promise<any>;

function buildOpts(body?: any) {
  const methodOpts = { method: 'post' };
  const headerOpts = { headers: useRequestHeaders(['cookie']) as HeadersInit };
  const bodyOpts = body ? { body: body } : {};

  return {
    ...methodOpts,
    ...headerOpts,
    ...bodyOpts,
  };
}

function isAuthed(payload: any) {
  return payload?.status !== 'unauthenticated' && payload?.status !== 'unknown';
}

export function useGateway<T>(route: string, body?: any, state?: any) {
  const opts = buildOpts(body) as any;
  let data: any, error: any, handleRefresh: ((b: any) => void) | undefined;

  try {
    const response = useFetch<T>(route, opts);
    handleRefresh = (b: any) => {
      response.refresh(buildOpts(b) as any);
    };
    if (isAuthed(response?.data?.value)) {
      data = response.data;
    }
    if (state && data) {
      state.value = data.value;
    }
  } catch (e: unknown) {
    error = e;
  }

  return [data as Ref<T | undefined>, error, handleRefresh];
}

export async function $gateway<T>(route: string, body?: any, state?: any) {
  const opts = buildOpts(body) as any;
  let data: T | undefined, error: any;

  try {
    const response = await $fetch<T>(route, opts);
    if (isAuthed(response)) {
      data = response;
    }
    if (state && data) {
      state.value = data;
    }
  } catch (e: unknown) {
    error = e;
  }

  return [data, error];
}
