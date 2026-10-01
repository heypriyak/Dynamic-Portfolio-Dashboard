# Technical Note

## Approach

The dashboard keeps a typed portfolio snapshot in the page component. It mirrors the supplied 29-holding report across Financial, Technology, Consumer, Power, Pipes and Others. Each row contains the stock symbol, sector, exchange, purchase price, quantity, CMP, P/E and latest earnings. Investment, present value, gain/loss and portfolio percentage are calculated from those fields instead of being stored twice.

The browser calls `/api/market` every 15 seconds. That server route requests the Yahoo Finance quote endpoint for CMP values and returns the saved snapshot if the request fails. Keeping that request on the server means a future provider key would not be exposed in client code.

## API limitations

Yahoo Finance and Google Finance do not offer stable, supported public APIs for this use case. Yahoo's quote endpoint is unofficial and can be rate-limited or changed. Google Finance values are kept in the local snapshot because scraping the page would be brittle and difficult to verify. The interface makes this limitation visible to the user.

For production, I would add a provider adapter, server-side cache, request batching and a scheduled refresh job. A database could then store verified daily snapshots and the UI could read from that cache rather than depending on every browser refresh.

## Data and UI decisions

Sector totals are grouped from the same calculated rows as the table, so the summary cannot drift from the holdings. Positive and negative returns use separate colors. The table scrolls horizontally on small screens while summary cards and sector blocks rearrange for mobile.

The supplied report contains a few unavailable values, including LTI Mindtree CMP and some fundamentals. Those remain `N/A` in the dashboard and are excluded from present-value totals until a live provider returns a value. The BSE numeric identifiers are preserved as provided, while separate Yahoo symbols are used only when a market lookup is available.
