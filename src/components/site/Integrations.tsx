const integrations = ["GitHub", "GitLab", "Bitbucket", "Slack", "Linear"];

export function Integrations() {
  return (
    <div className="dark">
      <section className="py-14 md:py-20 bg-secondary/30 text-foreground border-y border-border">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
            Works Where You Already Work
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            No new tools. No behavior change required. Tsuin lives where you
            already work.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground"
              >
                {name}
              </div>
            ))}
            <div className="flex items-center px-4 py-2.5 rounded-lg border border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground">
              More...
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
