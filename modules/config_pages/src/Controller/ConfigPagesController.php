<?php

namespace Drupal\config_pages\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\config_pages\ConfigPagesTypeInterface;
use Drupal\Core\Extension\ThemeHandlerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Drupal\config_pages\Entity\ConfigPagesType;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Class ConfigPagesController.
 *
 * @package Drupal\config_pages
 */
class ConfigPagesController extends ControllerBase {

  /**
   * The config page storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected $ConfigPagesStorage;

  /**
   * The config page type storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected $ConfigPagesTypeStorage;

  /**
   * The theme handler.
   *
   * @var \Drupal\Core\Extension\ThemeHandlerInterface
   */
  protected $themeHandler;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $entity_type_manager = $container->get('entity_type.manager');
    return new static(
      $entity_type_manager->getStorage('config_pages'),
      $entity_type_manager->getStorage('config_pages_type'),
      $container->get('theme_handler'),
      $entity_type_manager
    );
  }

  /**
   * ConfigPagesController constructor.
   *
   * @param \Drupal\Core\Entity\EntityStorageInterface $config_pages_storage
   *   The config page storage.
   * @param \Drupal\Core\Entity\EntityStorageInterface $config_pages_type_storage
   *   The config page type storage.
   * @param \Drupal\Core\Extension\ThemeHandlerInterface $theme_handler
   *   The theme handler.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager
   */
  public function __construct(EntityStorageInterface $config_pages_storage,
                              EntityStorageInterface $config_pages_type_storage,
                              ThemeHandlerInterface $theme_handler,
                              EntityTypeManagerInterface $entity_type_manager) {
    $this->ConfigPagesStorage = $config_pages_storage;
    $this->ConfigPagesTypeStorage = $config_pages_type_storage;
    $this->themeHandler = $theme_handler;
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * Presents the config page creation form.
   *
   * @param \Drupal\config_pages\ConfigPagesTypeInterface $config_pages_type
   *   The config page type to add.
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The current request object.
   *
   * @return array
   *   A form array as expected by drupal_render().
   */
  public function addForm(ConfigPagesTypeInterface $config_pages_type, Request $request) {
    $config_page = $this->ConfigPagesStorage->create(
      [
        'type' => $config_pages_type->id(),
      ]);
    return $this->entityFormBuilder()->getForm($config_page);
  }

  /**
   * Provides the page title for this controller.
   *
   * @param \Drupal\config_pages\ConfigPagesTypeInterface $config_pages_type
   *   The config page type being added.
   *
   * @return string
   *   The page title.
   */
  public function getAddFormTitle(ConfigPagesTypeInterface $config_pages_type) {
    $config_pages_types = ConfigPagesType::loadMultiple();
    $config_pages_type = $config_pages_types[$config_pages_type->id()];
    return $this->t('Add %type config page', ['%type' => $config_pages_type->label()]);
  }

  /**
   * Presents the config page creation/edit form.
   *
   * @param \Drupal\config_pages\ConfigPagesTypeInterface $config_pages_type
   *   The config page type to add.
   *
   * @return array
   *   A form array as expected by drupal_render().
   */
  public function classInit(ConfigPagesTypeInterface $config_pages_type = NULL) {
    $cp_type = $config_pages_type->id();
    $typeEntity = ConfigPagesType::load($cp_type);

    if (empty($typeEntity)) {
      throw new NotFoundHttpException();
    }

    $contextData = $typeEntity->getContextData();

    $config_page_ids = $this->ConfigPagesStorage
      ->getQuery()
      ->condition('type', $cp_type)
      ->condition('context', $contextData)
      ->execute();

    if (!empty($config_page_ids)) {
      $config_page_id = array_shift($config_page_ids);
      $entityStorage = $this->entityTypeManager->getStorage('config_pages');
      $config_page = $entityStorage->load($config_page_id);
    }
    else {
      $config_page = $this->ConfigPagesStorage->create([
        'type' => $cp_type,
      ]);
    }
    return $this->entityFormBuilder()->getForm($config_page);
  }

  /**
   * Presents the config page confiramtion form.
   *
   * @return array
   *   A form array as expected by drupal_render().
   */
  public function clearConfirmation($config_pages) {
    return \Drupal::formBuilder()->getForm('Drupal\config_pages\Form\ConfigPagesClearConfirmationForm', $config_pages);
  }

}
