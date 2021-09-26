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
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

export default allowCors;
