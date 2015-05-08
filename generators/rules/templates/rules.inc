<?php
/**
 * @file
 * <%= module_name %>.rules.inc
 */
 
/**
 * Implements hook_rules_data_info().
 */
function <%= module_name %>_rules_data_info() {
  return array(
    'node' => array(
      'label' => t('content'), 
      'parent' => 'entity', 
      'group' => t('Node'),
    ),
    // Formatted text as used by in hook_entity_property_info() for text fields. 
    'text_formatted' => array(
      'label' => t('formatted text'), 
      'ui class' => 'RulesDataUITextFormatted', 
      'wrap' => TRUE, 
      'property info' => entity_property_text_formatted_info(),
    ),
  );
}

/**
 * Implements hook_rules_action_info().
 */
function <%= module_name %>_rules_action_info() {
  return array(
    'mail_user' => array(
      'label' => t('Send a mail to a user'), 
      'parameter' => array(
        'user' => array(
          'type' => 'user',
          'label' => t('Recipient'),
        ),
      ), 
      'group' => t('System'), 
      'base' => 'rules_action_mail_user', 
      'callbacks' => array(
        'validate' => 'rules_action_custom_validation', 
        'help' => 'rules_mail_help',
      ),
    ),
  );
}

/**
 * Implements hook_rules_category_info().
 */
function <%= module_name %>_rules_category_info() {
  return array(
    'rules_data' => array(
      'label' => t('Data'),
      'equals group' => t('Data'),
      'weight' => -50,
    ),
    'fluxtwitter' => array(
      'label' => t('Twitter'),
      'icon font class' => 'icon-twitter',
      'icon font background color' => '#30a9fd',
    ),
  );
}

/**
 * Implements hook_rules_condition_info().
 */
function <%= module_name %>_rules_condition_info() {
  return array(
    'rules_condition_text_compare' => array(
      'label' => t('Textual comparison'),
      'parameter' => array(
        'text1' => array('label' => t('Text 1'), 'type' => 'text'),
        'text2' => array('label' => t('Text 2'), 'type' => 'text'),
      ),
      'group' => t('Rules'),
    ),
  );
}

/**
 * Implements hook_rules_event_info().
 */
function <%= module_name %>_rules_event_info() {
  $items = array(
    'node_insert' => array(
      'label' => t('After saving new content'),
      'group' => t('Node'),
      'variables' => rules_events_node_variables(t('created content')),
    ),
    'node_update' => array(
      'label' => t('After updating existing content'),
      'group' => t('Node'),
      'variables' => rules_events_node_variables(t('updated content'), TRUE),
    ),
    'node_presave' => array(
      'label' => t('Content is going to be saved'),
      'group' => t('Node'),
      'variables' => rules_events_node_variables(t('saved content'), TRUE),
    ),
    'node_view' => array(
      'label' => t('Content is going to be viewed'),
      'group' => t('Node'),
      'variables' => rules_events_node_variables(t('viewed content')) + array(
        'view_mode' => array('type' => 'text', 'label' => t('view mode')),
      ),
    ),
    'node_delete' => array(
      'label' => t('After deleting content'),
      'group' => t('Node'),
      'variables' => rules_events_node_variables(t('deleted content')),
    ),
  );
  // Specify that on presave the node is saved anyway.
  $items['node_presave']['variables']['node']['skip save'] = TRUE;
  return $items;
}

/**
 * Implements hook_rules_data_info().
 */
function <%= module_name %>_rules_data_info() {
  return array(
    'node' => array(
      'label' => t('content'),
      'parent' => 'entity',
      'group' => t('Node'),
    ),
    // Formatted text as used by in hook_entity_property_info() for text fields.
    'text_formatted' => array(
      'label' => t('formatted text'),
      'ui class' => 'RulesDataUITextFormatted',
      'wrap' => TRUE,
      'property info' => entity_property_text_formatted_info(),
    ),
  );
}

/**
 * Implements hook_rules_plugin_info().
 */
function <%= module_name %>_rules_plugin_info() {
  return array(
    'or' => array(
      'label' => t('Condition set (OR)'),
      'class' => 'RulesOr',
      'embeddable' => 'RulesConditionContainer',
      'component' => TRUE,
      'extenders' => array(
        'RulesPluginUIInterface' => array(
          'class' => 'RulesConditionContainerUI',
        ),
      ),
    ),
    'rule' => array(
      'class' => 'Rule',
      'embeddable' => 'RulesRuleSet',
      'extenders' => array(
        'RulesPluginUIInterface' => array(
          'class' => 'RulesRuleUI',
        ),
      ),
      'import keys' => array('DO', 'IF'),
    ),
  );
}

/**
 * Implements hook_rules_condition_info_alter().
 */
function <%= module_name %>_rules_action_info_alter(&$actions) {
  // The rules action is more powerful, so hide the core action
  unset($actions['rules_core_node_assign_owner_action']);
  // We prefer handling saving by rules - not by the user.
  unset($actions['rules_core_node_save_action']);
}

/**
 * Implements hook_rules_condition_info_alter().
 */
function <%= module_name %>_rules_condition_info_alter(&$conditions) {
  // Change conditions.
}

/**
 * Implements hook_rules_event_info_alter().
 */
function <%= module_name %>_rules_event_info_alter(&$events) {
  // Change events.
}

/**
 * Implements hook_rules_data_info_alter().
 */
function <%= module_name %>_rules_data_info_alter(&$data_info) {
  // Change data types.
}
