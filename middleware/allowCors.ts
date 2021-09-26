const allowCors =
  (fn: (req: any, res: any) => any) =>
  async (
    req: { method: string },
    res: {
      setHeader: (arg0: string, arg1: string | boolean) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        end: { (): void; new (): any };
      };
    }
  ) => {
    const origin = process.env.NEXT_PUBLIC_R8
      ? process.env.NEXT_PUBLIC_R8.toString()
      : "";

    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    //To handle preflight requests
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return await fn(req, res);
  };

export default allowCors;
