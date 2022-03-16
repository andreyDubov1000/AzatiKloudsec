import React from 'react'
import { ActionButton } from '@component/elements'
import styles from './IntegrationRow.module.scss'
import { IAccount } from '@component/scansDev/Scans'
import { ReactComponent as Chevron } from 'assets/icons/chevron-down-Bold.svg'

export interface IntegrationRowProps extends IAccount {
  user_id: string | undefined
  cloud_id: string | undefined
}

const IntegrationRow: React.FC<IntegrationRowProps> = ({
  user_id,
  AccountId = '',
  AccountAlias = '',
  CfTemplateVersion = '',
  Reachability = '',
  KloudsecRoleCfTemplateUpToDate = true,
  CfStackId = '',
}) => {
  const UpToDate = KloudsecRoleCfTemplateUpToDate

  const onClick = () => {
    window.open(
      `https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/update?stackId=${CfStackId}&templateURL=https%3A%2F%2Fs3.eu-west-1.amazonaws.com%2Fkloudsec-public-assets%2FKloudSecCustomerRole.yaml&param_ExternalID=${user_id}`
    )
  }

  return (
    <div className={styles.row}>
      <div className={styles.title}>
        <p>{AccountAlias}</p>
        <p>{AccountId}</p>
      </div>
      <div>{CfTemplateVersion}</div>
      <div>{Reachability === 'OK' ? <Chevron className={styles.chevron} /> : null}</div>
      <div>
        <ActionButton className={styles.button} type='filled' onClick={onClick} disabled={UpToDate}>
          Update Role
        </ActionButton>
      </div>
    </div>
  )
}

export default IntegrationRow
