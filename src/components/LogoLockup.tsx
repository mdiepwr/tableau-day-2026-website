import { Fragment, type CSSProperties } from 'react';
import type { Partner } from '../data/site';

interface LogoLockupProps {
  partners: Partner[];
}

/**
 * Co-branded partner lockup. Each logo is sized from the responsive
 * --size-logo token, scaled by its own optical correction, so the pair reads
 * as balanced rather than merely being the same number of pixels tall. That
 * token carries --hero-scale, so the lockup grows with the rest of the landing.
 *
 * The separator takes `text-h2` (24/32px) rather than a body step: it has to
 * hold its own against 42/54px logos, and roughly 0.6 of the logo height is
 * what keeps the proportion the lockup had before the hero was enlarged.
 */
export default function LogoLockup({ partners }: LogoLockupProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {partners.map((partner, index) => (
        <Fragment key={partner.id}>
          {index > 0 && (
            <span aria-hidden="true" className="text-h2 text-muted">
              &times;
            </span>
          )}
          <img
            src={partner.logo.src}
            width={partner.logo.width}
            height={partner.logo.height}
            alt={partner.name}
            className="h-(--partner-logo-height) w-auto"
            style={
              {
                '--partner-logo-height': `calc(var(--size-logo) * ${partner.logo.opticalScale})`,
              } as CSSProperties
            }
          />
        </Fragment>
      ))}
    </div>
  );
}
